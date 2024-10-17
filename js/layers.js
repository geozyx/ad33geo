function ad33geoLayerPoint(idPoint, urlJSON, radiusPoint, fillColor, infoKey, textInfoKey, idInfoModal) {
    const lGeoJSONLayer = new deck.GeoJsonLayer({
        id: idPoint,
        data: urlJSON,
        // Styles
        filled: true,
        pointRadiusMinPixels: 3,
        pointRadiusScale: 2000,
        getPointRadius: radiusPoint,
        getFillColor: fillColor,
        // Interactive props
        pickable: true,
        autoHighlight: true,

        onClick: info => {
            if (info.object) {
                // Use infoKey to dynamically access the property
                const propertyValue = info.object.properties[infoKey] || 'N/A';
                
                // Set content for the modal
                document.getElementById('modalContent').innerHTML =
                    `${textInfoKey} / ${propertyValue}`;

                // Display the modal
                document.getElementById(idInfoModal).style.display = 'block';
            }
        }
    });
	return lGeoJSONLayer;
}

function ad33geoLayerLine (idLine, urlJSON, lineWidth,infoKey, textInfoKey, idInfoModal) {
	const lGeoJSONLayer = new deck.GeoJsonLayer({
	id: idLine,
	data: urlJSON,
	filled: true, // Preenche o polígono
	stroked: true, // Desenha as bordas do polígono
	getFillColor: (d) => getColorFromAttribute(d.properties[infoKey]),
	getLineColor: (d) => getColorFromAttribute(d.properties[infoKey]), // Cor da linha
	lineWidthMinPixels: lineWidth, // Largura mínima da linha
	pickable: true, // Permite que o polígono seja clicado
	autoHighlight: true,
	getCursor: 'grab',
	  
    onClick: info => {
            if (info.object) {
                // Use infoKey to dynamically access the property
                const propertyValue = info.object.properties[infoKey] || 'N/A';
                
                // Set content for the modal
                document.getElementById('modalContent').innerHTML =
                    `${textInfoKey} / ${propertyValue}`;

                // Display the modal
                document.getElementById(idInfoModal).style.display = 'block';
            }
        }
	});
	return lGeoJSONLayer;
}

