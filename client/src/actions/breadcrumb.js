import BreadcrumbPatternItem
    from "../utils/breadcrumb_pattern_item/breadcrumb_pattern_item";
import { pathToURL } from "./strings";

const getBreadcrumbTitle = (index, parts, currentPath) => {
    // Если это последний элемент, добавляем его как простой текст
    if (index === parts.length - 1) {
        return { title: parts[index] };
    } else {
        // Иначе добавляем его как ссылку
        return({
            title:
                <BreadcrumbPatternItem
                    currentPath={pathToURL(currentPath)}
                    title={parts[index]}
                />
        });
    }
}

export const generateBreadcrumbItems = (url) => {
    // Разделяем URL на части, убирая начальную и конечную косые черты
    const parts = url.replace(/(^\/|\/$)/g, '').split('/');

    // Найти индекс первого вхождения 'disk'
    const rootIndex = parts.indexOf('disk');

    // Если 'disk' не найден, возвращаем пустой массив
    if (rootIndex === -1) {
        return [];
    }

    parts[rootIndex] = 'Файлы'

    // Инициализируем массив items
    const items = [];

    // Формируем базовый путь для ссылок
    let currentPath = '/disk/';

    items.push(getBreadcrumbTitle(rootIndex, parts, currentPath))

    // Перебираем части URL начиная с rootIndex + 1
    for (let i = rootIndex + 1; i < parts.length; i++) {
        currentPath += `${parts[i]}/`;
        items.push(getBreadcrumbTitle(i, parts, currentPath))
    }

    return items;
}