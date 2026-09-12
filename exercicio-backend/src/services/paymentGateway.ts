/**
 * Gateway de pagamento externo simulado.
 *
 * Representa uma integração de terceiro: tem latência e pode falhar.
 * Trate como um serviço externo real - você não controla o comportamento dele,
 * apenas como a sua aplicação reage.
 */

export interface ChargeResult {
  paymentId: string
  status: 'approved'
}

export class PaymentError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PaymentError'
  }
}

let counter = 0

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const paymentGateway = {
  /**
   * Cobra um valor (em centavos). Retorna um paymentId em caso de sucesso.
   * Lança PaymentError quando a cobrança é recusada.
   */
  async charge(amountCents: number): Promise<ChargeResult> {
    await delay(30 + Math.floor(Math.random() * 60))

    if (amountCents <= 0) {
      throw new PaymentError('Valor de cobrança inválido.')
    }

    counter += 1
    return {
      paymentId: `pay_${Date.now()}_${counter}`,
      status: 'approved'
    }
  }
}
