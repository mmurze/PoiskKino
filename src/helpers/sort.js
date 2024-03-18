const enumTypeSort = {
    ascending: 1,
    decreasing: -1,
    nothing: 0
};
const enumSortBy = {
    year: 0,
    timing: 1,
    rating: 2,
    nothing: 3
}
const searchTypes = [
    {
        name: "Дата выхода по убыванию",
        typeSort: enumTypeSort.decreasing,
        sortBy: enumSortBy.year
    },
    {
        name: "Дата выхода по возрастанию",
        typeSort: enumTypeSort.ascending,
        sortBy: enumSortBy.year
    },
    {
        name: "Рейтинг по убыванию",
        typeSort: enumTypeSort.decreasing,
        sortBy: enumSortBy.rating
    },
    {
        name: "Рейтинг по возрастанию",
        typeSort: enumTypeSort.ascending,
        sortBy: enumSortBy.rating
    },
    {
        name: "Хронометраж по убыванию",
        typeSort: enumTypeSort.decreasing,
        sortBy: enumSortBy.timing
    },
    {
        name: "Хронометраж по возрастанию",
        typeSort: enumTypeSort.ascending,
        sortBy: enumSortBy.timing
    }
]
function sortedBy(typeSort, sortBy, array) {
    let res = array
    switch (sortBy) {
        case enumSortBy.timing:
            switch (typeSort){
                case enumTypeSort.ascending:
                    res.sort((a, b) => a.movieLength > b.movieLength ? 1 : -1);
                    break;
                case enumTypeSort.decreasing:
                    res.sort((a, b) => a.movieLength < b.movieLength ? 1 : -1);
                    break;
            }
            break;
        case enumSortBy.year:
            switch (typeSort){
                case enumTypeSort.ascending:
                    res.sort((a, b) => a.year > b.year ? 1 : -1);
                    break;
                case enumTypeSort.decreasing:
                    res.sort((a, b) => a.year < b.year ? 1 : -1);
                    break;
            }
            break;
        case enumSortBy.rating:
            switch (typeSort){
                case enumTypeSort.ascending:
                    res.sort((a, b) => a.rating.kp > b.rating.kp ? 1 : -1);
                    break;
                case enumTypeSort.decreasing:
                    res.sort((a, b) => a.rating.kp < b.rating.kp ? 1 : -1);
                    break;
            }
            break;
    }
    return res
}

export {enumTypeSort, enumSortBy, sortedBy, searchTypes}