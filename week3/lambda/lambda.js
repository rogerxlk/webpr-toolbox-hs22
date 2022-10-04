const id = x => x;
const konst = x => y => x; //oft wird konst auch fst gennant = first
const snd = x => y => y; //snd = second

const T =  konst; //const T = trueBranch => falseBranch => trueBranch;
const F =  snd; //const F = falseBranche => trueBranch => falseBranch;

// const and = x => y => x (y(T)(F)) (y(F)(F)); //ausführbare spezifikation von const "and"
// const and = x => y => x (y(T)(F)) (F); //äquivalent zu oben
// const and = x => y => x (y) (F); //äquivalent zu oben
const and = x => y => x (y) (x); //äquivalent zu oben

// const or = x => y => x (y(T)(T)) (y(T)(F));
// const or = x => y => x (T) (y(T)(F)); //äquivalent zu oben
const or = x => y => x (x) (y); //äquivalent zu oben

const Pair = fn => fl => selector => selector(fn)(fl); //Pair für Datenstrukturen.
// const firstname = x => y => x; //=konst (braucht es nichtmal, da konst bereits oben definiert)
// const lastname = x => y => y; //=snd (braucht es nichtmal, da konst bereits oben definiert)

const Left = x => f => g => f(x);
const Right = x => f => g => g(x);
// const either = e => handleLeft => handleRight => e (handleLeft)(handleRight);
// const either = e => x => y => e (x)(y); //eta Reduktion
// const either = e => x => e (x); //eta Reduktion
// const either = x => x; //alpha translation
const either = id; //kann auch noch elimniert werden. Grundsatz: lambda calcul verwenden, dann schrumpfen bis aufs min.







// ----- special -----

const Tuple = n => [
    parmStore (n + 1) ( [] ) (parms => parms.reduce( (accu, it) => accu(it), parms.pop() ) ), // ctor
    ...Array.from( {length:n}, (it, idx) => iOfN (n) (idx) () )                    // selectors
];

const iOfN = n => i => value => // from n curried params, take argument at position i,
    n === 0
        ? value
        : x => iOfN (n-1) (i-1) ( i === 0 ? x : value );

const T = konst; // const T = trueBranch => falseBranch => trueBranch;
const F = snd; // const F = trueBranch => falseBranch => falseBranch;

const parmStore = n => args => onDone =>  // n args to come
    n === 0
        ? onDone(args)
        : arg => parmStore(n - 1)([...args, arg]) (onDone); // store parms in array

const Choice = n => [
    ...Array.from( {length:n}, (it, idx) => parmStore(n+1) ([]) (parms => parms[idx+1] (parms[0]) ) ), // ctors
    id
];