let fs = require("fs")
let Highbrow = require("./src/highbrow")

let networkConfiguration = {
    name: "simple SP / TM network example",
    corticalColumns: [{
        name: "column1",
        layers: [
            {
                name: "inputLayer",
                miniColumns: false,
                neuronCount: 100,
                dimensions: {
                    x: 10, y: 10, z: 1
                }
            },
            {
                name: "sptmLayer",
                miniColumns: true,
                neuronCount: 4096,
                dimensions: {
                    x: 30, y: 35, z: 4
                }
            }
        ]
    }]
}

network = Highbrow.createHtmNetwork(networkConfiguration)
// console.log(network.toString(verbose=true))

for (line of fs.readFileSync("data/highbrow-out.txt", "utf-8").trim().split("\n")) {
    let data = JSON.parse(line)
    network.update(data)
}
