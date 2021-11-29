import { BigInt, store } from "@graphprotocol/graph-ts"
import {
  DeTrust,
  TrustAdded,
  TrustFinished,
  TrustRevoked,
  TrustFundAdded,
  TrustReleased,
  SetIrrevocableCall
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

export function handleTrustFinished(event: TrustFinished): void {
  store.remove('Trust', event.params.trustId.toHex())
}

export function handleTrustRevoked(event: TrustRevoked): void {
  store.remove('Trust', event.params.trustId.toHex())
}

export function handleTrustFundAdded(event: TrustFundAdded): void {
  let trust = Trust.load(event.params.trustId.toHex())
  if (trust == null) {
    return
  }
  trust.totalAmount = trust.totalAmount.plus(event.params.amount)
  trust.cumAmount = trust.cumAmount.plus(event.params.amount)

  trust.save()
}

export function handleTrustReleased(event: TrustReleased): void {
  let trust = Trust.load(event.params.trustId.toHex())
  if (trust == null) {
    return
  }
  trust.releasedAmount = trust.releasedAmount.plus(event.params.amount)
  trust.totalAmount = trust.totalAmount.minus(event.params.amount)
  // if (trust.totalAmount.gt(BigInt.fromI32(0))) {
  //   trust.nextReleaseTime = trust.nextReleaseTime.plus(
  //     event.block.timestamp.minus(
  //       trust.nextReleaseTime
  //     ).div(
  //       trust.timeInterval
  //     ).plus(
  //       BigInt.fromI32(1)
  //     ).times(
  //       trust.timeInterval
  //     )
  //   )
  // }
  trust.nextReleaseTime = event.params.nextReleaseTime

  trust.save()
}

export function handleSetIrrevocable(call: SetIrrevocableCall): void {
  let trust = Trust.load(call.inputs.tId.toHex())
  if (trust == null) {
    return
  }
  trust.revocable = false

  trust.save()
}
