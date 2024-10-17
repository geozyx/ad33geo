function ad33geoLayerPoint(overlay, idPoint, urlJSON, radiusPoint, fillColor, infoKey, textInfoKey, idInfoModal) {
    // Create the overlay BR-101

    const pt = new deck.GeoJsonLayer({
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

    overlay = new deck.MapboxOverlay({
        layers: [pt],
    });
    map.addControl(overlay);
}
