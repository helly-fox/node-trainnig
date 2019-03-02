const { EventEmitter } = require('events');
const fs = require('fs');

export default class DirWatcher extends EventEmitter {
    watchSync(path, delay = 1000) {
        let content = [],
            newContent = [];
        setInterval(() => {
            try {
                newContent = fs.readdirSync(path);
            } catch (e) {
                console.error(e);
            }
            if (content.toString() !== newContent.toString()) {
                this.emit('dirwatcher:changed', newContent);
                content = newContent;
            }
        }, delay)
    }

    watch(path, delay) {
        let content = [];
        setInterval(() => {
            fs.readdir(path, (err, files) => {
                if (err) {
                    console.error(err);
                }
                if (content.toString() !== files.toString()) {
                    this.emit('dirwatcher:changed', path, files);
                    content = files;
                }
            });
        }, delay)
    }
}