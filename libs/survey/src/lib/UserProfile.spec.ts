import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  it('should create an instance', () => {
    expect(new UserProfile()).toBeTruthy();
  });

  it('can add new attributes', () => {
    const profile = new UserProfile();

    profile.addAttribute({
      name: 'email',
      type: 'email',
    });

    expect(profile.attributes.length).toEqual(1);
    expect(profile.attributes[0].name).toEqual('email');
  });

  it('can set attribute values', () => {
    const profile = new UserProfile();

    profile.addAttribute({
      name: 'email',
      type: 'email',
    });

    profile.setAttributeValue('email', 'test@test.com');
    expect(profile.attributes[0].value).toEqual('test@test.com');
  });

  it('can get all profile attributes with values', () => {
    const profile = new UserProfile();

    profile.addAttribute({
      name: 'email',
      type: 'email',
    });

    profile.addAttribute({
      name: 'name',
      type: 'string',
    });

    profile.setAttributeValue('email', 'test@test.com');
    profile.setAttributeValue('name', 'test user');

    expect(profile.get()).toStrictEqual({
      email: 'test@test.com',
      name: 'test user',
    });
  });
});
