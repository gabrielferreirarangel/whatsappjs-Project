const enviarMensagem = async (numero, mensagem) => {
  try {
    // 🔥 modo teste (não envia de verdade)
    const MODO_TESTE = true;

    if (MODO_TESTE) {
      console.log(`[SIMULAÇÃO] Enviando para ${numero}: ${mensagem}`);
      return;
    }

    // aqui depois você coloca o client do whatsapp-web.js
    // await client.sendMessage(numero, mensagem);

  } catch (err) {
    throw new Error('Erro ao enviar mensagem');
  }
};
export default { enviarMensagem };