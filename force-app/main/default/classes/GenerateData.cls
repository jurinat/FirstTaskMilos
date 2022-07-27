public with sharing class GenerateData{
  public void generateAccounts(){

    System.debug('tests');

    List<Account> accounts = new List<Account>();

    List<String> accountNames = new List<String>{ 'Amanda', 'Jon', 'Valentina', 'Francis' };

    for (Integer i = 0; i < accountNames.size(); i++){

      Account account = new Account();
      account.Name = accountNames[i];

      accounts.add(account);
    }
    insert accounts;

    for (Account account : accounts){

      generateMyOffersAndAddOfferTags(account);
    }
  }

  public void generateMyOffersAndAddOfferTags(Account account){

    List<OfferTag__c> offerTags = new List<OfferTag__c>();
    List<MyOffer__c> myOffers = new List<MyOffer__c>();

    for (Integer i = 0; i < 4; i++){
      offerTags = generateOfferTags();
      MyOffer__c myOffer1 = new MyOffer__c(Account__c = account.id, Name = 'Investice ' + i, Tag1__c = offerTags.get(0).Id, Tag2__c = offerTags.get(1).Id, Tag3__c = offerTags.get(2).Id, Tag4__c = offerTags.get(3).Id);

      myOffers.add(myOffer1);
    }
    insert myOffers;
  }

  public List<OfferTag__c> generateOfferTags(){

    List<OfferTag__c> offerTags = new List<OfferTag__c>();

    for (Integer i = 0; i < 4; i++){
      OfferTag__c offerTag1 = new OfferTag__c(Name = 'Tag ' + i);
      offerTags.add(offerTag1);
    }

    insert offerTags;
    return offerTags;
  }
}