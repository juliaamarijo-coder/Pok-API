
const formularioBusca = document.getElementById("form-busca");
const SelecionarPokemon = document.getElementById("input-pokemon");
const MensagemStatus = document.getElementById("mensagem-status");
const CardPokemon = document.getElementById("card-pokemon");
const IdPokemon = document.getElementById("poke-id");
const ImagemPokemon = document.getElementById("poke-img");
const PokemonTipo = document.getElementById("poke-tipo");
const PokemonNome = document.getElementById("poke-nome");

// FUNÇÃO PARA BUSCAR O POKÉMON
async function BuscarPokemon(nomeOuId) {

    const termo = nomeOuId.toLowerCase().trim();

    const url = `https://pokeapi.co/api/v2/pokemon/${termo}`;

    MensagemStatus.textContent = "Buscando Pokémon...";
    CardPokemon.classList.add("oculto");

    try {

        // Fazer a requisição
        const resposta = await fetch(url);

        // Verificar se houve erro
        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado!");
        }

        // Extrair os dados
        const dados = await resposta.json();

        // PREENCHER O CARD

        // Número do Pokémon
        IdPokemon.textContent = `#${dados.id}`;

        // Nome do Pokémon
        PokemonNome.textContent = dados.name;

        // Imagem do Pokémon
        ImagemPokemon.src = dados.sprites.other["official-artwork"].front_default
            || dados.sprites.front_default;

        // Tipo do Pokémon
        const tipos = dados.types.map(tipo => tipo.type.name);

        PokemonTipo.textContent = tipos.join(" / ");

        // Mostrar o card
        CardPokemon.classList.remove("oculto");

        // Limpar mensagem de status
        MensagemStatus.textContent = "";

    } catch (erro) {

        MensagemStatus.textContent = erro.message;

        console.log("Falha! Tente novamente!");
        console.log(erro.message);

    }
}

// EVENTO DO FORMULÁRIO
formularioBusca.addEventListener("submit", (event) => {

    event.preventDefault();

    BuscarPokemon(SelecionarPokemon.value);

});
