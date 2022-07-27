public with sharing class FirstTask {
 
    public FirstTask() {
        createAccount();
    }

    private void createAccount(){
        
        List<Account> acct = [SELECT Id,Name FROM Account WHERE NAME = 'Amanda' OR NAME = 'Jon' OR NAME = 'Francis' OR NAME = 'Valentina'];
        delete acct;
        List<Account> accountList = new List<Account>();
        List<String> accountNames = new List<String>{'Amanda','Jon','Valentina','Francis'};

        for (Integer i=0; i < 4;i++) {
                Account account = new Account();   
                createMyOffers(account);
                account.Name = accountNames.get(i);
                accountList.add(account);
        }
        insert accountList;
    }

    public void createMyOffers(Account account){

        List<OfferTag__c> offerTagyList = new List<OfferTag__c>();
        List<MyOffer__c> myOffersList = new List<MyOffer__c>();

            for(Integer i = 0; i < 4; i++){
                
                offerTagyList = createOfferTags();

                MyOffer__c myOffer = new MyOffer__c();
                myOffer.Account__c = account.Id;
                myOffer.Name = 'Bono '+i;
                myOffer.Tag1__c = offerTagyList.get(0).Id;
                myOffer.Tag2__c = offerTagyList.get(1).Id;
                myOffer.Tag3__c = offerTagyList.get(2).Id;
                myOffer.Tag4__c = offerTagyList.get(3).Id; 
                myOffersList.add(myOffer);
            }
        insert myOffersList;
    }
 
    public List<OfferTag__c> createOfferTags(){
        
        List<OfferTag__c> offerTagyList = new List<OfferTag__c>(); 

            for(Integer i = 0; i < 4; i++){

                OfferTag__c offerTag = new OfferTag__c();
                offerTag.Name = 'Tag '+i;
                offerTagyList.add(offerTag);      
            }
        insert offerTagyList;
        return offerTagyList;
    } 
}


