import angular from 'angular';

export default function () {
    return function (arr, start, end) {
        if (!angular.isArray(arr)) {
            return [];
        }

        return arr.slice(start, end);
    };
};