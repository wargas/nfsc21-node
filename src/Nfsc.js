const crypto = require('crypto')
const parametros_mestre = require('./parametros/mestre.json');
const parametros_item = require('./parametros/item.json');
const parametros_cadastro = require('./parametros/cadastro.json');


class Nfsc {

    data = null;

    constructor(data) {
        this.data = data
    }

    make() {
        const mestres = this.data.items.map((fatura, index) => {
            return this.fillMestre(fatura, index);
        })

        const items = this.data.items.map((fatura, index) => {
            return this.fillItem(fatura, index)
        })

        const cadastros = this.data.items.map((fatura, index) => {
            return this.fillCadastro(fatura, index)
        })


        return { mestres, items, cadastros };
    }

    fillMestre(fatura, index) {
        let fill = parametros_mestre;

        fill[0]["default"] = fatura.documento
        fill[2]["default"] = fatura.nome
        fill[3]["default"] = fatura.uf
        fill[7]["default"] = fatura.cliente_id
        fill[8]["default"] = this.data.emissao
        fill[11]["default"] = this.data.numero + index
        fill[13]["default"] = fatura.valor.toFixed(2).replace('.', '')
        fill[14]["default"] = fatura.valor.toFixed(2).replace('.', '')
        fill[19]["default"] = this.data.competencia
        fill[20]["default"] = index + 1
        fill[21]["default"] = fatura.telefone
        fill[22]["default"] = (fatura.documento.lenght > 11) ? 1 : 2;
        fill[23]["default"] = (fatura.documento.lenght > 11) ? 1 : 3;
        fill[25]["default"] = fatura.telefone
        fill[26]["default"] = this.data.cnpj
        fill[27]["default"] = fatura.fatura_id
        fill[28]["default"] = fatura.valor.toFixed(2).replace('.', '')

        fill = fill.map(i => {
            if (i.tipo === "N") {
                return this.numero(i.default, i.tamanho)
            }

            return this.texto(i.default, i.tamanho)
        })

        fill[12] = this.md5(`${fill[0]}${fill[11]}${fill[13]}${fill[14]}${fill[15]}${fill[8]}${fill[26]}`)
        fill[35] = this.md5(fill.join("").substring(0, 393))

        return fill
    }

    fillItem(fatura, index) {
        let fill = parametros_item;

        fill[0]["default"] = fatura.documento
        fill[1]["default"] = fatura.uf
        fill[5]["default"] = this.data.emissao
        fill[8]["default"] = this.data.numero + index
        fill[11]["default"] = fatura.fatura_id
        fill[17]["default"] = fatura.valor.toFixed(2)
        fill[20]["default"] = fatura.valor.toFixed(2)
        fill[26]["default"] = this.data.competencia
        fill[27]["default"] = fatura.cliente_id
        fill[28]["default"] = fatura.valor.toFixed(2)

        fill = fill.map(i => {
            if (i.tipo === "N") {
                return this.numero(i.default, i.tamanho)
            }

            return this.texto(i.default, i.tamanho)
        })

        fill[37] = this.md5(fill.join("").substring(0, 299))

        return fill
    }


    fillCadastro(fatura, index) {
        let fill = parametros_cadastro;

        fill[0]["default"] = fatura.documento;
        fill[2]["default"] = fatura.nome;
        fill[3]["default"] = fatura.logradouro;
        fill[4]["default"] = fatura.numero;
        fill[5]["default"] = fatura.complemento;
        fill[6]["default"] = fatura.cep.replace(/\D/i, "");
        fill[7]["default"] = fatura.bairro;
        fill[8]["default"] = fatura.cidade;
        fill[9]["default"] = fatura.uf;
        fill[10]["default"] = fatura.telefone;
        fill[11]["default"] = fatura.cliente_id;
        fill[12]["default"] = fatura.telefone;
        fill[13]["default"] = fatura.uf;
        fill[14]["default"] = this.data.emissao;
        fill[17]["default"] = this.data.numero + index
        fill[18]["default"] = fatura.ibge;

        fill = fill.map(i => {
            if (i.tipo === "N") {
                return this.numero(i.default, i.tamanho)
            }

            return this.texto(i.default, i.tamanho)
        })

        fill[20] = this.md5(fill.join("").substring(0, 255))

        return fill;
    }


    texto(value, tamanho) {
        return String(value).substring(0, tamanho)
            .padEnd(tamanho, " ");
    }

    numero(value, tamanho) {
        return String(value)
            .replace(/\D/g, '')
            .substring(0, tamanho)
            .padStart(tamanho, "0")
    }

    md5(string) {
        return crypto
            .createHash('md5')
            .update(string, 'latin1')
            .digest('hex')
    }

}
module.exports = Nfsc;