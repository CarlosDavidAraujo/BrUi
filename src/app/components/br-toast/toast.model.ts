// O 'type' controla a aparência (ícone, cores) do toast.
export type ToastType = 'success' | 'error' | 'info' | 'warning';

// A interface completa para um toast, incluindo propriedades que o serviço irá gerar.
export interface ToastData {
  id: string; // ID único para cada toast
  type: ToastType;
  title: string;
  message: string;
  duration: number; // Duração em milissegundos
  timeoutId?: any; // Referência ao setTimeout para poder cancelá-lo
}

// As opções que o desenvolvedor pode passar ao criar um toast.
// Todas são opcionais, exceto a mensagem.
export type ToastOptions = Partial<Omit<ToastData, 'id' | 'message'>> &
  Pick<ToastData, 'message'>;
