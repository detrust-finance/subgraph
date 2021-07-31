import { BigInt } from "@graphprotocol/graph-ts"
import {
  DeTrust,
  TrustAdded,
  TrustFinished,
  TrustFundAdded,
  TrustReleased
} from "../generated/DeTrust/DeTrust"
import { Trust } from "../generated/schema"

export function handleTrustAdded(event: TrustAdded): void {
  let trust = new Trust(event.params.trustId.toHex())

  trust.name = event.params.name
  trust.settlor = event.params.settlor
  trust.beneficiary = event.params.beneficiary
  trust.nextReleaseTime = event.params.startReleaseTime
  trust.timeInterval = event.params.timeInterval
  trust.amountPerTimeInterval = event.params.amountPerTimeInterval
  trust.totalAmount = event.params.totalAmount
  trust.cumAmount = event.params.totalAmount
  trust.releasedAmount = BigInt.fromI32(0)
  trust.revocable = event.params.revocable

  trust.save()
}

//export function handleTrustFinished(event: TrustFinished): void {}

export function handleTrustFundAdded(event: TrustFundAdded): void {
  let trust = Trust.load(event.params.trustId.toHex())
  if (trust == null) {
    return
  }
  trust.totalAmount = trust.totalAmount + event.params.amount
  trust.cumAmount = trust.cumAmount + event.params.amount

  trust.save()
}

export function handleTrustReleased(event: TrustReleased): void {
  let trust = Trust.load(event.params.trustId.toHex())
  if (trust == null) {
    return
  }
  trust.releasedAmount = trust.releasedAmount + event.params.amount
  trust.totalAmount = trust.totalAmount - event.params.amount
  
  trust.save()
}
