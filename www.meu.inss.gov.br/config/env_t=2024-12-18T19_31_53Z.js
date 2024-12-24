function env() {
    return {
		REACT_APP__AMBIENTE: 'production',
		REACT_APP__CLIENT_ID: 'autorizar.meu.inss.gov.br',
		REACT_APP__BASE_URL: 'https://meu.inss.gov.br/',
		REACT_APP__URL_LOGIN: 'https://sso.acesso.gov.br/',
		REACT_APP__URL_API: 'https://vip-pmeuinss-api.inss.gov.br/apis/',
		REACT_APP__URL_ARQ: 'https://vip-pmeuinss-arq.inss.gov.br/apis/',
		REACT_APP__KBA_URL: 'https://cidadao.dataprev.gov.br/cadastroDni/pages/segurado/questionarioKBA.xhtml',
		REACT_APP__CAPTCHA_SITE_KEY_DESAFIO: '6LcUaIkeAAAAANhzdzkoRao671i3gzRFj-RRSUSW',
		REACT_APP__CAPTCHA_SITE_KEY_INVISIVEL: '6LcTahsmAAAAAN60eaYvJ_UIsW9ilCspEsemEb6_',
		REACT_APP__HTML_SCRIPT_CHAT_BOT: "\x3Cscript id='omni-chat-snippet' src='https://prd-inss-webclient.omni.extreme.digital/static/js/main.js'>\x3C/script><div id='omni-chat-snippet'></div>",
		REACT_APP__AUDITORIA_API_REGEX: '.^',
		REACT_APP__AUDITORIA_FRONTEND_REGEX: '.^',
		REACT_APP__AUDITORIA_MANUAL_REGEX: '^evt-userId$|^evt-sessionId$|^log-.*$',
		REACT_APP__BIOMETRIA_TEMPO_ENTRE_VERIFICACOES: '5',
		REACT_APP__BIOMETRIA_TEMPO_LIMITE_VERIFICACOES: '30',
		REACT_APP__FIREBASE_API_KEY: 'AIzaSyBNnInSky3lOeDsyks9s9msGhdL3nYJAZk',
		REACT_APP__FIREBASE_PROJECT_ID: 'dtp-meu-inss',
		REACT_APP__FIREBASE_APP_ID: '1:887332197528:web:48b3be08e37ccf5932eced',
		REACT_APP__FIREBASE_MINIMUM_FETCH_INTERVAL: 3600000,
		REACT_APP__URL_REAGENDAMENTO_SABI: 'https://sabiweb.inss.gov.br/sabiweb/remarcacao/inicio.view#sabiweb',
		REACT_APP__URL_ATUALIZACAO_CADASTRAL_RFB: 'https://servicos.receita.fazenda.gov.br/servicos/cpf/alterar/default.asp'
	};
}
