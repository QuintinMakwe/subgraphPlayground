import { Exchange } from "../generated/schema";
import { Transfer } from "../generated/Transfer/USDT";

export function handleTransfer(event: Transfer): void {
    let transfer = Exchange.load(event.transaction.hash.toHex());
    if (transfer === null) {
        transfer = new Exchange(event.transaction.hash.toHex());
    }

    transfer.from = event.params.from.toHex();
    transfer.to = event.params.to.toHex();
    transfer.amount = event.params.value;
    transfer.block = event.block.number;

    transfer.save();
}