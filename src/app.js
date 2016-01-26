"use strict";

var dict = {
        'Репка': { who: 'Репка', whom: 'Репку' },
        'Дедка': { who: 'Дедка', whom: 'Дедку' },
        'Бабка': { who: 'Бабка', whom: 'Бабку' },
        'Внучка': { who: 'Внучка', whom: 'Внучку' },
        'Жучка': { who: 'Жучка', whom: 'Жучку' },
        'Кошка': { who: 'Кошка', whom: 'Кошку' },
        'Мышка': { who: 'Мышка', whom: 'Мышку' },
        resolve: (key, form) => {
            return dict[key] ? dict[key][form] : key;
        }
    },
    сотоварищи = Object.keys(dict);

class Сказка { 
    начало() { 
        console.log(
            'Посадил дед репку.\n');
        console.log('Выросла репка большая-пребольшая.');
        console.log('Пошел дед ее рвать.');
    }

    sayAskHelp(who, whom) { 
        console.log('\nПозвал ' + dict.resolve(who, 'who') + ' ' + dict.resolve(whom, 'whom'));
    }
    
    saySnatchNext(who, whom) { 
        console.log(dict.resolve(who, 'who') + ' за ' + dict.resolve(whom, 'whom'));
    }
    
    sayPull(count) { 
        console.log(count < 2 ? 'Тянет-потянет ... ' : 'Тянут-потянут ... ');
    }
    
    sayPullFail(count) { 
        console.log(count < 2 ? ' ... а вытянуть не может' : ' ... а вытянуть не могут');
    }
    
    конец() { 
        console.log('\nИ вытянули репку!')
        console.log('Тут и сказочке конец, а кто слушал – молодец.')
    }
}

class ДедкаСотоварищи { 
    constructor(сказка) { 
        this.сказка = сказка;
        this.компания = [];
    }
    add(personName) { 
        this.компания.unshift(personName);
    }
    неМогутВытянутьРепку() { 
        for (var i = 0; i < this.компания.length; i++) { 
            let name = this.компания[i];

            var idx = сотоварищи.indexOf(name),
                prev = сотоварищи[idx - 1];
            
            if (idx !== -1 && prev)
                this.сказка.saySnatchNext(name, prev);
        }
        
        this.сказка.sayPull(this.компания.length);
        
        if (this.компания.length < 6)
            this.сказка.sayPullFail(this.компания.length);
        
        return this.компания.length < 6;
    }
    естьКогоЗватьНаПомощь() { 
        if (this.компания.length < 1)
            return;
            
        var idx = сотоварищи.indexOf(this.компания[0]);
        return idx !== -1 && сотоварищи[idx + 1]; 
    }
    зовутНаПомощь() { 
        var name = this.компания[0];

        var idx = сотоварищи.indexOf(name),
            next = сотоварищи[idx + 1];
            
        this.сказка.sayAskHelp(name, next);
        this.компания.unshift(next);
    }
}

var сказка = new Сказка(),
    дедкаСотоварищи = new ДедкаСотоварищи(сказка);

дедкаСотоварищи.add(сотоварищи[1]);
сказка.начало();

while (дедкаСотоварищи.неМогутВытянутьРепку() && дедкаСотоварищи.естьКогоЗватьНаПомощь()) { 
     дедкаСотоварищи.зовутНаПомощь()
};

сказка.конец();