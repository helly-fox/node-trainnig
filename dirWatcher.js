const { EventEmitter } = require('events');
const fs = require('fs');

export default class DirWatcher extends EventEmitter {
    watch(path, delay) {
        let content = {};
        setInterval(() => {
            fs.readdir(path, (err, files) => {
                const savedPathes = Object.keys(content);
                if (err) {
                    console.error(err);
                }
                if (
                    (!files.every(f => savedPathes.includes(f)) &&
                    files.length === savedPathes.length) ||
                    !files.every(f =>
                        fs.statSync(`${path}/${f}`).size === content[f]
                    )
                ) {
                    this.emit('dirwatcher:changed', path, files);
                    files.forEach(f => {
                        content[f] = fs.statSync(`${path}/${f}`).size;
                    });
                }
            });
        }, delay)
    }
}