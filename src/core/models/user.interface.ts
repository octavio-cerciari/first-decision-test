export interface UserInterface {
    name: string,
    lastName: string,
    phone: string,
    email: string,
    status: 'Ativo' | 'Bloqueado' | 'Pendente',
    profile: 'Supervisor' | 'Gerente' | 'Analista' | 'Suporte' | 'Desenvolvedor',
    language: string,
    createdDate: string,
    lastAccess: string,
    preferredContact: 'Telefone' | 'E-Mail' | 'Todos';
}