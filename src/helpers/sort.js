const sortTypes = [
    "Сортировка по умолчанию",
    "Дата выхода по убыванию",
    "Дата выхода по возрастанию",
    "Рейтинг по убыванию",
    "Рейтинг по возрастанию",
    "Хронометраж по убыванию",
    "Хронометраж по возрастанию"
]

function sortedBy(sortType, array) {
    let id = 0
    sortTypes.forEach((item, index) => {
        if (item === sortType) {
            id = index
        }
    })
    
    let res = array
    switch (id){
        case 0:
            break
        case 1:
            res.sort((a, b) => a.year < b.year ? 1 : -1);
            break;
        case 2:
            res.sort((a, b) => a.year > b.year ? 1 : -1);
            break;
        case 3:
            res.sort((a, b) => a.rating.kp < b.rating.kp ? 1 : -1);
            break;
        case 4:
            res.sort((a, b) => a.rating.kp > b.rating.kp ? 1 : -1);
            break;
        case 5:
            res.sort((a, b) => a.movieLength < b.movieLength ? 1 : -1);
            break;
        case 6:
            res.sort((a, b) => a.movieLength > b.movieLength ? 1 : -1);
            break;
        
    }
    return res
}



export {sortedBy, sortTypes}
