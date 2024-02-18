
export const KorpayMask = (mask: string, value: string, alternativemMask?: string) => {

    if (!mask || !value)
        return;
    if (alternativemMask) {
        if (value?.length > mask?.length) {
            return setMask(alternativemMask, value)
        } else return setMask(mask, value)
    }
    else return setMask(mask, value)
};


const setMask = (mask: string, value: string,) => {
    const valid = removeNonAlphanumeric(value)
    const elements = [];
    for (let i = 0; i < mask.length; i++) {
        if (mask[i] !== "#") {
            elements.push(i);
        }
    }
    return cutString(insert(valid, extract(mask)), mask.length);
}

function extract(str: string): { posicao: number, item: string }[] {
    return [...str].map((item, index) => ({ posicao: index, item })).filter(({ item }) => item !== '#');
}

function insert(str: string, trecos: { posicao: number, item: string }[]) {
    const result = [...str];
    for (const { posicao, item } of trecos) {
        if (posicao < result.length) {
            result.splice(posicao, 0, item);
        }
    }
    return result.join('');
}

export function removeNonAlphanumeric(str: string): string {
    return str.replace(/[^a-z0-9]/gi, "");
}

function cutString(str: string, maxLength: number): string {
    return str.slice(0, maxLength);
}