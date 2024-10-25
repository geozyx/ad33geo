function getRandomPointInPolygon(polygon) {
    const [minX, minY, maxX, maxY] = turf.bbox(polygon); // Obter a caixa delimitadora
    const centroid = turf.centroid(polygon).geometry.coordinates; // Calcula o centroide do polígono
    let point;
    const maxDistance = 0.01; // Distância máxima aceitável (em graus, ajuste conforme necessário)

    do {
        // Gera um ponto aleatório dentro da caixa delimitadora
        const x = Math.random() * (maxX - minX) + minX;
        const y = Math.random() * (maxY - minY) + minY;
        point = turf.point([x, y]); // Cria um ponto
    } while (
        !turf.booleanPointInPolygon(point, polygon) || // Verifica se o ponto está no polígono
        turf.distance(point, turf.point(centroid)) > maxDistance // Verifica se está perto do centroide
    );

    // Se o ponto estiver muito longe do centroide, retorna o centroide
    if (turf.distance(point, turf.point(centroid)) > maxDistance) {
        return centroid;
    }

    return point.geometry.coordinates; // Retorna as coordenadas do ponto
}
