export class DemandeJustificatifDTO {
  demandeId: number;
  imageUrl: string[];
  ids: number[];
  publicIds: string[];

  constructor(demandeId: number, justificatif: string[], idjustifs: number[], publicidsjustif: string[]) {
    this.demandeId = demandeId;
    this.imageUrl = justificatif;
    this.ids = idjustifs;
    this.publicIds = publicidsjustif;
  }
}
