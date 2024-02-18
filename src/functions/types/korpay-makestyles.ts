
export interface IStyles {
    [key : string] : React.CSSProperties
}

export const KorpayMakeStyles = (styles: { [name: string]: React.CSSProperties }) => {
    return function () {
        return styles as { [name: string]: React.CSSProperties }
    };

};