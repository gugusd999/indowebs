class ControlTable {
    constructor(a) {
        this.table = a
        this.dataRow = [];
    }

    ai(name) {
        this.dataRow.push(` \`${name}\` INT(11) AUTO_INCREMENT PRIMARY KEY `)
    }

    char(name, length, def) {
        this.dataRow.push(` \`${name}\` VARCHAR(${length}) NOT NULL DEFAULT '${def}' `)
    }

    text(name) {
        this.dataRow.push(` \`${name}\` TEXT `)
    }

    longtext(name) {
        this.dataRow.push(` \`${name}\` LONGTEXT `)
    }

    timecreate(name) {
        this.dataRow.push(` \`${name}\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP `)
    }

    timeupdate(name) {
        this.dataRow.push(` \`${name}\` DATETIME NULL DEFAULT CURRENT_TIMESTAMP `)
    }

    cek() {
        query(`SELECT * FROM \`${this.table}\``, function (a) {
            console.log(a)
        })
    }

    createTable(func) {
        var createTable = `CREATE TABLE \`${this.table}\` (
                        ${this.dataRow.join(", \n   ")}
                    )
                    `;
        query(createTable, function (a) {
            func(a)
        })

    }
}