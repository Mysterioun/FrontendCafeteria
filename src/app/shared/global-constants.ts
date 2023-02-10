export class GlobalConstants{


    //Mensagem
    public static genericError: string = "Algo deu errado. Tente mais tarde.";

    public static unauthorized: string = "Você não possui autorização para acessar essa pagina.";

    public static productExistError: string = "Produto já existe!";

    public static productAdded: string = "Produto adicionado com sucesso";

    //Regex

    public static nomeRegex: string = "[a-zA-Z0-9 ]*";
    public static emailRegex: string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
    public static numeroContatoRegex: string = "^[e0-9]{10,10}$";

    //Variavel

    public static error: string = "error";


}