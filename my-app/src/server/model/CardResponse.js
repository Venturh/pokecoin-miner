/**
 * Pokecoin
 * The Pokecoin documentation
 *
 * The version of the OpenAPI document: 1.3.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import Pokemoncard from './Pokemoncard';

/**
 * The CardResponse model module.
 * @module model/CardResponse
 * @version 1.3.1
 */
class CardResponse {
    /**
     * Constructs a new <code>CardResponse</code>.
     * Returns object for one card
     * @alias module:model/CardResponse
     * @param card {module:model/Pokemoncard} 
     */
    constructor(card) { 
        
        CardResponse.initialize(this, card);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, card) { 
        obj['card'] = card;
    }

    /**
     * Constructs a <code>CardResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CardResponse} obj Optional instance to populate.
     * @return {module:model/CardResponse} The populated <code>CardResponse</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CardResponse();

            if (data.hasOwnProperty('card')) {
                obj['card'] = Pokemoncard.constructFromObject(data['card']);
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/Pokemoncard} card
 */
CardResponse.prototype['card'] = undefined;






export default CardResponse;
