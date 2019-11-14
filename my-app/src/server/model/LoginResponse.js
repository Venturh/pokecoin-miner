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

/**
 * The LoginResponse model module.
 * @module model/LoginResponse
 * @version 1.3.1
 */
class LoginResponse {
    /**
     * Constructs a new <code>LoginResponse</code>.
     * The response if login was successful
     * @alias module:model/LoginResponse
     * @param token {String} 
     */
    constructor(token) { 
        
        LoginResponse.initialize(this, token);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, token) { 
        obj['token'] = token;
    }

    /**
     * Constructs a <code>LoginResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LoginResponse} obj Optional instance to populate.
     * @return {module:model/LoginResponse} The populated <code>LoginResponse</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new LoginResponse();

            if (data.hasOwnProperty('token')) {
                obj['token'] = ApiClient.convertToType(data['token'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} token
 */
LoginResponse.prototype['token'] = undefined;






export default LoginResponse;

