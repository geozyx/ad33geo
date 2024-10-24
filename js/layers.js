function ad33geoLayerLabel(idLabel, urlJSON, labelField) {
    return new deck.TextLayer({
        id: idLabel,
        data: urlJSON,
        getPosition: d => d.geometry.coordinates,
        getText: d => d.properties[labelField], // Campo do GeoJSON usado como rótulo
        getSize: 16,
        getColor: [0, 0, 0, 255], // Cor preta
        getTextAnchor: 'middle',
        getAlignmentBaseline: 'center',
	pickable: true
    });
}
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
