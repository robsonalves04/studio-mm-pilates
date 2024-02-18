
export const toValidDate = (date: string): Date => {
    const [day, month, year] = date.split('/');
    const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));
    return parsedDate;
}

export const isMaiorDeIdade = (dataNascimento: Date): boolean => {
    const dataAtual = new Date();
    const idadeEmMilissegundos = dataAtual.getTime() - dataNascimento.getTime();
    const idadeEmAnos = idadeEmMilissegundos / (1000 * 60 * 60 * 24 * 365.25);
    return idadeEmAnos >= 18;
};

// Validador da data, impede colocar data 00/00/0000
export const isDataMinima = (dataNascimento: Date): boolean => {
    const dataAtual = new Date();
    const idadeEmMilissegundos = dataAtual.getTime() - dataNascimento.getTime();
    const idadeEmAno = idadeEmMilissegundos / (1000 * 60 * 60 * 24 * 365.25);
    return idadeEmAno <= 100;
};

export const isValidDate = (date: string) : boolean => {
    try{
        toValidDate(date);
        return true;
    } catch(e : any){
        return false;
    }
}
// teste para validar as datas que n]ap sao de nascimento

export const validarData = (date : string) : Date =>{
    const [day,mouth,year] = date.split ('/');

    const analizarData = new Date(Number(year),Number(mouth)-1, Number (day));

    return  analizarData;
    
}    

export const validoMaior = (dataNascimento: Date): boolean => {
    const dataAtual = new Date();
    const idadeEmMilissegundos = dataAtual.getTime() - dataNascimento.getTime();
    const idadeEmAnos = idadeEmMilissegundos / (1000 * 60 * 60 * 24 * 365.25);
    return idadeEmAnos >= 0;
};