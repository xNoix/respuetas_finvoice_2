<?php
$url = 'https://api.roison.cl/feriados.json';
$data = json_decode(file_get_contents($url), true);

// Filtro de resultados por rango de fechas
$filteredData = array_filter($data['data'], function($item) {
  $date = $item['date'];
  return $date >= '2023-03-01' && $date <= '2023-05-01';
});
echo '<table>';
echo '<tr><th>ID</th><th>Fecha</th><th>Título</th></tr>';
foreach ($filteredData as $element) {
    echo '<tr>';
    echo '<td>' . $element['id'] . '</td>';
    echo '<td>' . $element['date'] . '</td>';
    echo '<td>' . $element['title'] . '</td>';
    echo '</tr>';
}
echo '</table>';
?>