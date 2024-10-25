// Adiciona uma fonte de dados GeoJSON ao mapa.
// idSource: Identificador único da fonte de dados.
// urlJSON: URL que aponta para o arquivo GeoJSON.
function ad33geoSource(idSource, urlJSON){
	map.addSource(idSource, {
            'type': 'geojson',
            'data': urlJSON
	});
}

// Adiciona uma camada de rótulos ao mapa, usando um campo específico do GeoJSON como texto.
// idLabel: Identificador único da camada de rótulos.
// idSource: Identificador da fonte de dados usada para a camada.
// fieldJSON: Nome do campo do GeoJSON que contém o texto do rótulo.
function ad33geoLabel(idLabel, idSource, fieldJSON, textSize, arrayAnchor){
	map.addLayer({
            'id': idLabel,
            'type': 'symbol',
            'source': idSource,
            'layout': {
                'text-field': ['get', fieldJSON],
                'text-variable-anchor': arrayAnchor,
                'text-radial-offset': 0.50,
                'text-justify': 'left',
		'text-size': textSize
            }
        });
}

// Cria uma camada de pontos usando o Deck.gl, com interação ao clicar que exibe informações em um modal.
// idPoint: Identificador único da camada de pontos.
// urlJSON: URL que aponta para o arquivo GeoJSON.
// radiusPoint: Função ou valor que determina o raio dos pontos.
// fillColor: Cor de preenchimento dos pontos.
// labelField: Nome do campo do GeoJSON usado para o valor exibido no modal.
// textlabelField: Texto exibido no modal que descreve o valor.
// idInfoModal: Identificador do modal onde as informações são exibidas.
function ad33geoLayerPoint(idPoint, urlJSON, radiusPoint, fillColor, labelField, textlabelField, idInfoModal) {
    return new deck.GeoJsonLayer({
        id: idPoint,
        data: urlJSON,
        // Estilos
        filled: true,
        pointRadiusMinPixels: 3,
        pointRadiusScale: 2000,
        getPointRadius: radiusPoint,
        getFillColor: fillColor,
	getText: f => f.properties.name,
        // Propriedades interativas
        pickable: true,
        autoHighlight: true,

        onClick: info => {
            if (info.object) {
                const propertyValue = info.object.properties[labelField] || 'N/A';
                document.getElementById('modalContent').innerHTML = 
                    `${textlabelField}: ${propertyValue}`;
                document.getElementById(idInfoModal).style.display = 'block';
            }
        }
    });
}

// Cria uma camada de linhas usando o Deck.gl, com interação ao clicar que exibe informações em um modal.
// idLine: Identificador único da camada de linhas.
// urlJSON: URL que aponta para o arquivo GeoJSON.
// lineWidth: Largura das linhas.
// labelField: Nome do campo do GeoJSON usado para determinar a cor das linhas e o valor exibido no modal.
// textlabelField: Texto exibido no modal que descreve o valor.
// idInfoModal: Identificador do modal onde as informações são exibidas.
function ad33geoLayerLine(idLine, urlJSON, lineWidth, labelField, textlabelField, idInfoModal) {
    return new deck.GeoJsonLayer({
        id: idLine,
        data: urlJSON,
        filled: true,
        stroked: true,
        getFillColor: d => getColorFromAttribute(d.properties[labelField]),
        getLineColor: d => getColorFromAttribute(d.properties[labelField]),
        lineWidthMinPixels: lineWidth,
        pickable: true,
        autoHighlight: true,
        getCursor: () => 'grab',

        onClick: info => {
            if (info.object) {
                const propertyValue = info.object.properties[labelField] || 'N/A';
                document.getElementById('modalContent').innerHTML = 
                    `${textlabelField}: ${propertyValue}`;
                document.getElementById(idInfoModal).style.display = 'block';
            }
        }
    });
}

// Cria uma camada de polígonos usando o Deck.gl, com interação ao clicar que exibe informações em um modal.
// idPoly: Identificador único da camada de polígonos.
// urlJSON: URL que aponta para o arquivo GeoJSON.
// fillColor: Cor de preenchimento dos polígonos.
// labelField: Nome do campo do GeoJSON usado para o valor exibido no modal.
// textlabelField: Texto exibido no modal que descreve o valor.
// idInfoModal: Identificador do modal onde as informações são exibidas.
function ad33geoLayerPolygon(idPoly, urlJSON, fillColor, labelField, textlabelField, idInfoModal){
    return new deck.GeoJsonLayer({
	id: idPoly,
	data: urlJSON,
	filled: true, // Preenche o polígono
	stroked: true, // Desenha as bordas do polígono
	getFillColor: fillColor,
	getLineColor: fillColor, // Cor da linha
	lineWidthMinPixels: 1, // Largura mínima da linha
	pickable: true, // Permite que o polígono seja clicado
	autoHighlight: true,
	getCursor: 'grab',
	  
    onClick: info => {
            if (info.object) {
                const propertyValue = info.object.properties[labelField] || 'N/A';
                document.getElementById('modalContent').innerHTML = 
                    `${textlabelField}: ${propertyValue}`;
                document.getElementById(idInfoModal).style.display = 'block';
            }
        }
	});

}
