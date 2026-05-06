import { useState } from "react";
import ReactDOM from "react-dom/client";

const brand = "#007a85";
const dark = "#1a2b4a";
const bg = "#f5f3ef";

const PLANOS = {
  basico: { nome: "Básico", preco: "R$ 19,90/mês", senha: "autoIA-basico", cor: "#007a85" },
  pro: { nome: "Pro", preco: "R$ 39,90/mês", senha: "autoIA-pro", cor: "#1a2b4a" },
};

const TABS_BASICO = [
  { id: "posts", label: "📱 Posts para Redes" },
  { id: "titulos", label: "🎯 Títulos Chamativos" },
];
const TABS_PRO = [
  { id: "posts", label: "📱 Posts para Redes" },
  { id: "titulos", label: "🎯 Títulos Chamativos" },
  { id: "vendas", label: "💬 Mensagens de Vendas" },
];

const inputStyle = {
  width: "100%", fontSize: 14, padding: "9px 12px",
  borderRadius: 8, border: "0.5px solid #ccc",
  background: "#fff", color: dark, fontFamily: "inherit",
};

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 13, color: "#555", marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}
function Input({ id, placeholder }) {
  return <input type="text" id={id} placeholder={placeholder} style={inputStyle} />;
}
function Textarea({ id, placeholder }) {
  return <textarea id={id} placeholder={placeholder} style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} />;
}
function Select({ id, options }) {
  return (
    <select id={id} style={inputStyle}>
      {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
    </select>
  );
}

function getPrompt(tipo) {
  const v = id => document.getElementById(id)?.value?.trim() || "";
  if (tipo === "posts") {
    const nicho = v("posts-nicho"), tema = v("posts-tema"), rede = v("posts-rede");
    if (!nicho || !tema) return null;
    return `Você é especialista em marketing digital para pequenos empreendedores brasileiros. Crie 1 post completo e pronto para ${rede} para o nicho: ${nicho}. Tema: ${tema}. Use linguagem natural, emojis e hashtags (se Instagram). Máximo 300 palavras. Escreva apenas o texto do post, sem explicações.`;
  }
  if (tipo === "titulos") {
    const nicho = v("tit-nicho"), tema = v("tit-tema"), obj = v("tit-obj");
    if (!nicho || !tema) return null;
    return `Você é copywriter especializado em pequenos negócios brasileiros. Crie 5 títulos chamativos para o nicho: ${nicho}, produto/tema: ${tema}, objetivo: ${obj}. Varie os estilos (pergunta, benefício, urgência, curiosidade, prova social). Liste apenas os 5 títulos numerados, sem explicações.`;
  }
  if (tipo === "vendas") {
    const produto = v("vnd-produto"), situacao = v("vnd-situacao"), tom = v("vnd-tom");
    if (!produto) return null;
    return `Você é especialista em vendas pelo WhatsApp para pequenos empreendedores brasileiros. Crie 1 mensagem para: ${situacao}. Produto/serviço: ${produto}. Tom: ${tom}. Seja natural, use emojis com moderação, inclua chamada para ação. Máximo 5 parágrafos curtos. Escreva apenas a mensagem pronta para enviar.`;
  }
}

function LoginScreen({ onLogin }) {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleLogin() {
    if (senha === PLANOS.pro.senha) { onLogin("pro"); return; }
    if (senha === PLANOS.basico.senha) { onLogin("basico"); return; }
    setErro("Senha incorreta. Verifique o e-mail de acesso.");
  }

  return (
    <div style={{ background: bg, minHeight: "100vh", fontFamily: "sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 16, border: "0.5px solid #d6d2c9", padding: "36px 32px", width: "100%", maxWidth: 380, textAlign: "center" }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: dark, marginBottom: 4 }}>
          Auto<span style={{ color: brand }}>IA</span>
        </div>
        <div style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>Plataforma de conteúdo com IA para empreendedores</div>
        <div style={{ textAlign: "left", marginBottom: 6 }}>
          <label style={{ fontSize: 13, color: "#555", display: "block", marginBottom: 6 }}>Senha de acesso</label>
          <input
            type="password"
            placeholder="Digite sua senha..."
            value={senha}
            onChange={e => setSenha(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={inputStyle}
          />
        </div>
        {erro && <div style={{ fontSize: 13, color: "#c0392b", marginBottom: 8, textAlign: "left" }}>{erro}</div>}
        <button onClick={handleLogin} style={{
          background: brand, color: "#fff", border: "none",
          padding: "11px 0", borderRadius: 8, fontSize: 14,
          fontWeight: 500, cursor: "pointer", width: "100%", marginTop: 8
        }}>Entrar</button>
        <div style={{ marginTop: 24, borderTop: "0.5px solid #eee", paddingTop: 18, display: "flex", gap: 10 }}>
          {[PLANOS.basico, PLANOS.pro].map(p => (
            <div key={p.nome} style={{ flex: 1, border: `1.5px solid ${p.cor}`, borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: p.cor, marginBottom: 2 }}>Plano {p.nome}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: dark }}>{p.preco}</div>
              <div style={{ fontSize: 11, color: "#aaa", marginTop: 4 }}>
                {p.nome === "Básico" ? "Posts + Títulos" : "Posts + Títulos + Mensagens de Vendas"}
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "#aaa", marginTop: 14 }}>
          Ainda não tem acesso? <span style={{ color: brand, cursor: "pointer", fontWeight: 500 }}>Assine agora</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [plano, setPlano] = useState(null);
  const [tab, setTab] = useState("posts");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});
  const [copied, setCopied] = useState(false);
  const [erro, setErro] = useState("");

  function handleLogin(p) { setPlano(p); setTab("posts"); }

  const TABS = plano === "pro" ? TABS_PRO : TABS_BASICO;
  const planoInfo = plano ? PLANOS[plano] : null;

  const API_KEY = import.meta.env.VITE_ANTHROPIC_KEY;

  async function gerar(tipo) {
    const prompt = getPrompt(tipo);
    if (!prompt) { setErro("Preencha todos os campos antes de gerar."); return; }
    setErro("");
    setLoading(true);
    setResults(r => ({ ...r, [tipo]: "" }));
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const texto = data.content?.find(b => b.type === "text")?.text || "Sem resposta.";
      setResults(r => ({ ...r, [tipo]: texto }));
    } catch {
      setErro("Erro ao conectar. Tente novamente.");
    }
    setLoading(false);
  }

  function copiar(tipo) {
    if (!results[tipo]) return;
    navigator.clipboard.writeText(results[tipo]).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  if (!plano) return <LoginScreen onLogin={handleLogin} />;

  const btnStyle = {
    background: brand, color: "#fff", border: "none",
    padding: "10px 22px", borderRadius: 8,
    fontSize: 14, fontWeight: 500, cursor: "pointer",
    opacity: loading ? 0.6 : 1,
  };

  return (
    <div style={{ background: bg, minHeight: "100vh", fontFamily: "sans-serif" }}>
      <div style={{ background: dark, color: "#fff", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>Auto<span style={{ color: "#5ecfda" }}>IA</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 12, background: planoInfo.cor, color: "#fff", padding: "4px 12px", borderRadius: 99 }}>
            Plano {planoInfo.nome} — {planoInfo.preco}
          </div>
          <button onClick={() => setPlano(null)} style={{ fontSize: 11, background: "transparent", color: "#aaa", border: "0.5px solid #aaa", borderRadius: 6, padding: "3px 10px", cursor: "pointer" }}>Sair</button>
        </div>
      </div>

      {plano === "basico" && (
        <div style={{ background: "#fff7e6", borderBottom: "1px solid #ffe0a0", padding: "10px 24px", fontSize: 13, color: "#8a5c00", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>⭐ Quer desbloquear <strong>Mensagens de Vendas</strong>?</span>
          <span style={{ color: brand, fontWeight: 500, cursor: "pointer" }}>Fazer upgrade para Pro →</span>
        </div>
      )}

      <div style={{ display: "flex", gap: 4, padding: "16px 24px 0", borderBottom: "1.5px solid #d6d2c9", background: bg }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setErro(""); }}
            style={{
              padding: "10px 16px", fontSize: 13, cursor: "pointer",
              borderRadius: "8px 8px 0 0",
              border: "1.5px solid transparent", borderBottom: "none",
              background: tab === t.id ? "#fff" : "transparent",
              borderColor: tab === t.id ? "#d6d2c9" : "transparent",
              borderBottomColor: tab === t.id ? "#fff" : "transparent",
              color: tab === t.id ? dark : "#666",
              fontWeight: tab === t.id ? 500 : 400,
            }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding: 24 }}>
        <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid #d6d2c9", padding: "20px 22px" }}>

          {tab === "posts" && <>
            <div style={{ fontSize: 16, fontWeight: 500, color: dark, marginBottom: 4 }}>Gerador de Posts para Redes Sociais</div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 18 }}>Textos prontos para Instagram, Facebook e WhatsApp no tom do seu nicho.</div>
            <Field label="Qual é o seu nicho?"><Input id="posts-nicho" placeholder="Ex: confeitaria, consultoria, moda feminina..." /></Field>
            <Field label="O que você quer comunicar?"><Textarea id="posts-tema" placeholder="Ex: lançamento de produto, promoção, dica do dia..." /></Field>
            <Field label="Rede social"><Select id="posts-rede" options={["Instagram", "Facebook", "WhatsApp"]} /></Field>
            <button style={btnStyle} disabled={loading} onClick={() => gerar("posts")}>{loading ? "Gerando..." : "Gerar post ✦"}</button>
          </>}

          {tab === "titulos" && <>
            <div style={{ fontSize: 16, fontWeight: 500, color: dark, marginBottom: 4 }}>Criador de Títulos Chamativos</div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 18 }}>Headlines que prendem atenção e geram cliques no tom certo.</div>
            <Field label="Qual é o seu nicho?"><Input id="tit-nicho" placeholder="Ex: academia, nutrição, marketing digital..." /></Field>
            <Field label="Produto, serviço ou tema"><Input id="tit-tema" placeholder="Ex: curso online, consulta, produto físico..." /></Field>
            <Field label="Objetivo do título">
              <Select id="tit-obj" options={[
                { value: "gerar curiosidade", label: "Gerar curiosidade" },
                { value: "vender direto", label: "Vender direto" },
                { value: "educar / ensinar", label: "Educar / ensinar" },
                { value: "engajar nas redes sociais", label: "Engajar nas redes" },
              ]} />
            </Field>
            <button style={btnStyle} disabled={loading} onClick={() => gerar("titulos")}>{loading ? "Gerando..." : "Criar títulos ✦"}</button>
          </>}

          {tab === "vendas" && <>
            <div style={{ fontSize: 16, fontWeight: 500, color: dark, marginBottom: 4 }}>Mensagens de Vendas no WhatsApp</div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 18 }}>Scripts de abordagem prontos para converter clientes.</div>
            <Field label="O que você vende?"><Input id="vnd-produto" placeholder="Ex: bolo personalizado, corte de cabelo, consultoria..." /></Field>
            <Field label="Situação da mensagem">
              <Select id="vnd-situacao" options={[
                { value: "primeiro contato com cliente", label: "Primeiro contato" },
                { value: "follow-up de orçamento enviado", label: "Follow-up de orçamento" },
                { value: "cliente que sumiu após conversa", label: "Cliente que sumiu" },
                { value: "oferta especial ou promoção", label: "Oferta especial" },
                { value: "pós-venda e fidelização", label: "Pós-venda / fidelização" },
              ]} />
            </Field>
            <Field label="Tom da mensagem">
              <Select id="vnd-tom" options={[
                { value: "descontraído e próximo", label: "Descontraído e próximo" },
                { value: "profissional e formal", label: "Profissional e formal" },
                { value: "urgente e persuasivo", label: "Urgente e persuasivo" },
              ]} />
            </Field>
            <button style={btnStyle} disabled={loading} onClick={() => gerar("vendas")}>{loading ? "Gerando..." : "Criar mensagem ✦"}</button>
          </>}

          {erro && <div style={{ marginTop: 14, fontSize: 13, color: "#c0392b" }}>{erro}</div>}

          {results[tab] && (
            <>
              <div style={{
                marginTop: 18, background: bg,
                borderLeft: `3px solid ${brand}`,
                borderRadius: "0 8px 8px 0",
                padding: "14px 16px", fontSize: 14,
                lineHeight: 1.7, color: dark, whiteSpace: "pre-wrap",
              }}>{results[tab]}</div>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button style={{ fontSize: 12, padding: "6px 14px", borderRadius: 6, border: `0.5px solid ${brand}`, background: "transparent", color: brand, cursor: "pointer" }}
                  onClick={() => copiar(tab)}>{copied ? "Copiado!" : "Copiar texto"}</button>
                <button style={{ fontSize: 12, padding: "6px 14px", borderRadius: 6, border: `0.5px solid ${brand}`, background: "transparent", color: brand, cursor: "pointer" }}
                  onClick={() => gerar(tab)}>Gerar outro</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
