function getColorFromAttribute(attributeValue) {
  switch (attributeValue) {
    case 'FAIXA DOMINIO':
      return [255, 0, 0]; // vermelho para "alto"
    case 'FAIXA NAO EDIFICANTE':
      return [255, 165, 0]; // laranja para "médio"
    case 'EIXO DA RODOVIA':
      return [0, 128, 0]; // verde para "baixo"
    default:
      return [128, 128, 128]; // cinza para valores desconhecidos
  }
}
