import { yandexMap, ymapMarker, loadYmap } from "vue-yandex-maps";

loadYmap({ ...settings, debug: true });
let map;
main();
async function main() {
    // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты API
    await loadYmap.ymaps3.ready;

    // Создание карты
    map = new loadYmap.ymaps3.YMap(document.getElementById("map-test"), {
        location: {
            // Координаты центра карты
            // Порядок по умолчанию: «долгота, широта»
            center: [55.205247, 25.077816],

            // Уровень масштабирования
            // Допустимые значения: от 0 (весь мир) до 21.
            zoom: 10
        }
    });

    // Добавляем слой для отображения схематической карты
    map.addChild(new loadYmap.ymaps3.YMapDefaultSchemeLayer());
}





