import { LightningElement, wire, api, track } from "lwc";
import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";
import { NavigationMixin } from "lightning/navigation";
import getOffrs from "@salesforce/apex/MyOfferController.getOffrs";
import getOffName from "@salesforce/apex/MyOfferController.getOffName";

export default class MyOffer extends NavigationMixin(LightningElement) {
  @api recordId;
  @api offrTagName;
  @track offer;
  @track offName;
  @track error;

  @wire(getOffrs, { accountId: "$recordId" })
  wiredAccount({ error, data }) {
    if (data) {
      this.offer = data;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.offer = undefined;
    }
  }

  @wire(getOffName, { name: "$offrTagName" })
  wiredasf({ error, data }) {
    if (data) {
      this.offName = data;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.offName = undefined;
    }
  }

  navigateToNewContactWithDefaults() {
    var date = new Date();
    date.setDate(date.getDate() + 30);
    var dateString = date.toISOString().split("T")[0];

    const defaultValues = encodeDefaultFieldValues({
      Name: "My Opportunity",
      LeadSource: "My Offer",
      StageName: "Prospecting",
      Amount: 1000.0,
      CloseDate: dateString,
      AccountId: this.recordId
    });

    console.log(defaultValues);
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Opportunity",
        actionName: "new"
      },
      state: {
        defaultFieldValues: defaultValues
      }
    });
  }
}
