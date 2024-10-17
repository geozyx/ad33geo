function ad33geoLayerPoint(idPoint, urlJSON, radiusPoint, fillColor, infoKey, textInfoKey, idInfoModal) {
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
                const propertyValue = info.object.properties[infoKey] || 'N/A';
                document.getElementById('modalContent').innerHTML = 
                    `${textInfoKey} / ${propertyValue}`;
                document.getElementById(idInfoModal).style.display = 'block';
            }
        }
    });
}

function ad33geoLayerLine(idLine, urlJSON, lineWidth, infoKey, textInfoKey, idInfoModal) {
    return new deck.GeoJsonLayer({
        id: idLine,
        data: urlJSON,
        filled: true,
        stroked: true,
        getFillColor: d => getColorFromAttribute(d.properties[infoKey]),
        getLineColor: d => getColorFromAttribute(d.properties[infoKey]),
        lineWidthMinPixels: lineWidth,
        pickable: true,
        autoHighlight: true,
        getCursor: () => 'grab',

        onClick: info => {
            if (info.object) {
                const propertyValue = info.object.properties[infoKey] || 'N/A';
                document.getElementById('modalContent').innerHTML = 
                    `${textInfoKey} / ${propertyValue}`;
                document.getElementById(idInfoModal).style.display = 'block';
            }
        }
    });
}

function ad33geoLayerPolygon(idPoly, urlJSON, fillColor, infoKey, textInfoKey, idInfoModal){
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
                const propertyValue = info.object.properties[infoKey] || 'N/A';
                document.getElementById('modalContent').innerHTML = 
                    `${textInfoKey} / ${propertyValue}`;
                document.getElementById(idInfoModal).style.display = 'block';
            }
        }
	});

}
