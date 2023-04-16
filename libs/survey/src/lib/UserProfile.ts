export type UserProfileAttributeTypes =
  | 'string'
  | 'number'
  | 'boolean'
  | 'date'
  | 'array'
  | 'object'
  | 'email';

export class UserProfileAttribute {
  name: string;
  type: UserProfileAttributeTypes;
  value?: string | number | boolean | Date | any[];
}

export class UserProfile {
  attributes: UserProfileAttribute[] = [];

  addAttribute(attribute: UserProfileAttribute) {
    this.attributes.push(attribute);
  }

  setAttributeValue(attributeName, value) {
    const attribute = this.attributes.find((a) => a.name === attributeName);

    if (!attribute) {
      throw new Error(`attribute not found: ${attributeName}`);
    }

    attribute.value = value;
  }

  get() {
    return this.attributes.reduce((acc, attribute) => {
      acc[attribute.name] = attribute.value;
      return acc;
    }, {});
  }
}
