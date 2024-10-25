
function ad33geoLayerLabelPolygon(data, idLabel, fieldJSON, textColor, textSize, textOffset, textAnchor, textHalo, colorHalo, fontFamily) {
    return new deck.TextLayer({
        id: idLabel,
        data: data.features,
        getPosition: d => getRandomPointInPolygon(d.geometry), // Usa a função para pegar um ponto dentro do polígono
        getText: d => d.properties[fieldJSON],
        getPixelOffset: d => textOffset,
	outlineWidth: textHalo,
	outlineColor: colorHalo,
        getAlignmentBaseline: 'center',
        getColor: textColor,
        getSize: textSize,
        getTextAnchor: textAnchor,
        fontFamily: fontFamily,
	sdf: true,
        pickable: true,
    });
}

/**
 * ad33geoLayerLabelPoint
 * Função para criar uma camada de rótulos no mapa com base nos parâmetros fornecidos.
 *
 * @param {Object} data - Objeto GeoJSON contendo as features (elementos) a serem rotuladas. Você deve buscar esse objeto a partir de uma URL usando fetch e, em seguida, passá-lo para a função.
 * @param {string} fieldJSON - Nome da propriedade dentro das features que será exibida como rótulo.
 * @param {Array} textColor - Array RGB com a cor do texto (ex: [0, 0, 0] para preto).
 * @param {number} textSize - Tamanho da fonte dos rótulos.
 * @param {string} textAnchor - Âncora do texto (ex: 'start', 'middle', 'end').
 * @param {string} textOffset - Para aumentar a distância do texto em relação ao ponto em uma camada de texto no Deck.gl . Ex.: [2, 3]
 * @param {string} textHalo - Contorno do texto.
 * @param {string} colorHalo - Cor do contorno do texto.
 * @param {string} fontFamily - Fonte do texto (ex: 'Arial Narrow').
 * @returns {deck.TextLayer} - Retorna uma camada de rótulos configurada.
 */
function ad33geoLayerLabelPoint(data, idLabel, fieldJSON, textColor, textSize, textOffset, textAnchor, textHalo, colorHalo, fontFamily) {
  return new deck.TextLayer({
    id: idLabel,
    data: data.features,
    getPosition: d => d.geometry.coordinates,
    getText: d => d.properties[fieldJSON],
    getPixelOffset: d => textOffset,
    outlineWidth: textHalo,
    outlineColor: colorHalo,
    getAlignmentBaseline: 'center',
    getColor: textColor,
    getSize: textSize,
    getTextAnchor: textAnchor,
    fontFamily: fontFamily,
    sdf: true,
    pickable: true,
  });
}

/**
 * ad33geoSource
 * Função para adicionar uma fonte GeoJSON ao mapa.
 *
 * @param {string} idSource - Identificador único da fonte a ser adicionada ao mapa.
 * @param {string} urlJSON - URL do arquivo GeoJSON que será usado como fonte de dados.
 */
function ad33geoSource(idSource, urlJSON){
	map.addSource(idSource, {
            'type': 'geojson',
            'data': urlJSON
	});
}

/**
 * ad33geoLabel
 * Função para adicionar uma camada de rótulos ao mapa com base em uma fonte existente.
 *
 * @param {string} idLabel - Identificador único da camada de rótulos.
 * @param {string} idSource - Identificador da fonte a ser utilizada para os rótulos.
 * @param {string} fieldJSON - Nome da propriedade dentro da fonte que será exibida como rótulo.
 * @param {number} textSize - Tamanho do texto dos rótulos.
 * @param {Array} arrayAnchor - Array de âncoras para o posicionamento do texto (ex: ['top', 'bottom', 'left', 'right']).
 */
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

/**
 * ad33geoLayerPoint
 * Função para criar uma camada de pontos no mapa com base em um arquivo GeoJSON.
 *
 * @param {string} idPoint - Identificador único da camada de pontos.
 * @param {string} urlJSON - URL do arquivo GeoJSON que contém os pontos a serem exibidos.
 * @param {function} radiusPoint - Função para determinar o raio dos pontos.
 * @param {Array} fillColor - Array RGB com a cor de preenchimento dos pontos (ex: [255, 0, 0] para vermelho).
 * @param {string} labelField - Nome da propriedade que será utilizada para exibir o rótulo do ponto.
 * @param {string} textlabelField - Texto descritivo que será exibido no modal ao clicar no ponto.
 * @param {string} idInfoModal - Identificador do modal que será exibido ao clicar em um ponto.
 * @returns {deck.GeoJsonLayer} - Retorna uma camada de pontos configurada.
 */
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
	getText: f => f.properties[labelField],
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

/**
 * ad33geoLayerLine
 * Função para criar uma camada de linhas no mapa com base em um arquivo GeoJSON.
 *
 * @param {string} idLine - Identificador único da camada de linhas.
 * @param {string} urlJSON - URL do arquivo GeoJSON que contém as linhas a serem exibidas.
 * @param {number} lineWidth - Largura mínima das linhas em pixels.
 * @param {string} labelField - Nome da propriedade que será utilizada para exibir o rótulo da linha.
 * @param {string} textlabelField - Texto descritivo que será exibido no modal ao clicar na linha.
 * @param {string} idInfoModal - Identificador do modal que será exibido ao clicar em uma linha.
 * @returns {deck.GeoJsonLayer} - Retorna uma camada de linhas configurada.
 */
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

/**
 * ad33geoLayerPolygon
 * Função para criar uma camada de polígonos no mapa com base em um arquivo GeoJSON.
 *
 * @param {string} idPoly - Identificador único da camada de polígonos.
 * @param {string} urlJSON - URL do arquivo GeoJSON que contém os polígonos a serem exibidos.
 * @param {Array} fillColor - Array RGB com a cor de preenchimento dos polígonos (ex: [0, 255, 0] para verde).
 * @param {string} labelField - Nome da propriedade que será utilizada para exibir o rótulo do polígono.
 * @param {string} textlabelField - Texto descritivo que será exibido no modal ao clicar no polígono.
 * @param {string} idInfoModal - Identificador do modal que será exibido ao clicar em um polígono.
 * @returns {deck.GeoJsonLayer} - Retorna uma camada de polígonos configurada.
 */
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
