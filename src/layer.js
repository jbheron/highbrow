/** @ignore */
const Renderable = require("./renderable")
/** @ignore */
const times = require("./utils").times
/** @ignore */
const NeuronState = require("./enums").NeuronState

/**
 * Represents a cortical layer within a {@link CorticalColumn}.
 */
class Layer extends Renderable {
    constructor(config, parent) {
        super(config, parent)
        this._buildLayer()
    }

    /**
     * This function accepts HTM state data and updates the positions and states
     * of all {@link Renderable} HTM components.
     * @param {Object} data - I don't know what this is going to look like yet.
     */
    update(activeCellIndexes, activeColumnIndexes) {
        console.log(activeCellIndexes)
        for (let index of activeCellIndexes) {
            this.getNeuronByIndex(index).state = NeuronState.active
        }
    }

    /**
     * @override
     */
    getOrigin() {
        throw new Error("Not implemented")
    }

    /**
     * @override
     */
    getChildren() {
        return this.getNeurons()
    }

    getNeurons() {
        return this._neurons
    }

    getNeuronByIndex(index) {
        return this.getNeurons().find(n => n.index == index)
    }

    /**
     * @override
     */
    toString(verbose = false) {
        let out = `${this.constructor.name} ${this.getName()}`
        if (verbose) {
            let children = this.getChildren()
            if (children.length) {
                for (let child of children) {
                    out += "\t" + child.toString().split("\n")
                                       .map(s => "\n\t" + s)
                                       .join("")
                }
            }
        } else {
            out += ` contains ${this._neurons.length} neurons`
        }
        return out
    }

    _buildLayer() {
        this._neurons = []
        times(this._config.neuronCount) (i =>
            this._neurons.push(new Neuron({
                index: i,
                state: NeuronState.inactive
            }, this))
        )
        if (this._config.miniColumns) {
            // TODO: implement minicolumns.
        }
    }

}

/**
 * Represents a mini-column within a {@link Layer}.
 */
class MiniColumn extends Renderable {
    constructor(config, parent) {
        super(config, parent)
    }

    /**
     * @override
     */
    getOrigin() {
        throw new Error("Not implemented")
    }
}

/**
 * Represents a pyramidal neuron. The atomic unit of HTM computation.
 */
class Neuron extends Renderable {
    constructor(config, parent) {
        super(config, parent)
        this._state = NeuronState.inactive
    }

    getOrigin() {
        throw new Error("Not implemented")
    }

    /**
     * @override
     */
    getChildren() {
        return []
    }

    /**
     * @override
     */
    getName() {
        return `${this._config.index} (${this._config.state})`
    }

    set state (state)  { this._state = state }
    get state () { return this._state }
    get index () { return this.getConfig()["index"] }

}

module.exports = Layer
