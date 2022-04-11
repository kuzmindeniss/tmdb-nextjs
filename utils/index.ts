export const getUrl = (url: string, options: {[key: string]: string | undefined}): string => {
    let queryString: string = '';
    let isFirstKey: boolean = true;
    for (const key in options) {
        if (!isFirstKey) {
            queryString += '&';
        } else {
            isFirstKey = false
        }

        queryString += key + '=' + options[key];
    }
    return encodeURI(url + '?' + queryString);
}

export const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(+year, +month, +day);
    return date.toLocaleString("ru", {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).replace(/\s*г\.$/, "");
}

function isJsonString(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}