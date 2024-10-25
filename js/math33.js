function getRandomPointInPolygon(polygon) {
    const [minX, minY, maxX, maxY] = turf.bbox(polygon); // Obter a caixa delimitadora do polígono
    let point;

    do {
        // Gera um ponto aleatório dentro da caixa delimitadora
        const x = Math.random() * (maxX - minX) + minX;
        const y = Math.random() * (maxY - minY) + minY;
        point = turf.point([x, y]); // Cria um ponto

    } while (!turf.booleanPointInPolygon(point, polygon)); // Repete até encontrar um ponto que esteja dentro do polígono

    return point.geometry.coordinates; // Retorna as coordenadas do ponto
}
