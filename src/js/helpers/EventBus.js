
const EventBus = {

    availableEvents: {
        "scrolling": []
    },

    addEventListener(type, listener){
        if(type in this.availableEvents){
            this.availableEvents[type].push(listener)
        } else {
            console.error(type + " <= key doesn't exists") 
        }
    },

    dispatchEvent({type, data}){
        if(type in this.availableEvents){
            for(let i = 0; i < this.availableEvents[type].length; i++){
                this.availableEvents[type][i](data)
            }
        }
    },

    removeListener(type, listener){
        if(type in this.availableEvents){
            this.availableEvents[type] = this.availableEvents.filter(eventListener => eventListener === listener)
        } else {
            console.error(type + " <= key doesn't exists") 
        }
    }
}
export default EventBus 