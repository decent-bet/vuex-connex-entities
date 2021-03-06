import { ConnexContract, OnConnexReady } from '@decent-bet/connex-entities';

@ConnexContract({
    import: {
        address: [{ a: 1 }],
        raw: {
            abi: [
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            name: '_from',
                            type: 'address'
                        },
                        {
                            indexed: true,
                            name: '_to',
                            type: 'address'
                        },
                        {
                            indexed: false,
                            name: '_value',
                            type: 'uint256'
                        }
                    ],
                    name: 'TransferContract3',
                    type: 'event'
                }
            ]
        }
    }
})
export class TestContract3 extends OnConnexReady {
    constructor() {
        super();
    }
}
