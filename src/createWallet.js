// Importando as dependências
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// Definir a rede
const network = bitcoin.networks.testnet

// Derivação de endereço de carteiras HD
const path = `m/84'/1'/0'/0` // Caminho de derivação para P2WPKH (SegWit nativo)

// Criando o Mnemonic para a seedphrase
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// Criando a raiz da carteira
let root = bip32.fromSeed(seed, network)

// Criando uma conta - par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2wpkh({
    pubkey: node.publicKey,
    network: network
}).address

console.log("Carteira Gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave privada: ", node.toWIF())
console.log("Seed: ", mnemonic);
