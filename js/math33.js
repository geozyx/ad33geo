function getRandomPointInPolygon(polygon, maxAttempts = 10) {
    const [minX, minY, maxX, maxY] = turf.bbox(polygon); // Caixa delimitadora
    const centroid = turf.centroid(polygon).geometry.coordinates; // Centroide
    const maxDistance = 0.01; // Distância máxima aceitável em graus
    let point;

    for (let i = 0; i < maxAttempts; i++) {
        // Gera um ponto aleatório dentro da caixa delimitadora
        const x = Math.random() * (maxX - minX) + minX;
        const y = Math.random() * (maxY - minY) + minY;
        point = turf.point([x, y]); // Cria o ponto

        // Verifica se o ponto está no polígono e próximo ao centroide
        if (
            turf.booleanPointInPolygon(point, polygon) &&
            turf.distance(point, turf.point(centroid)) <= maxDistance
        ) {
            return point.geometry.coordinates; // Ponto válido encontrado
        }
    }

    // Se nenhuma tentativa for bem-sucedida, retorna o centroide
    console.warn("Nenhum ponto válido encontrado, retornando o centroide.");
    return centroid;
}
