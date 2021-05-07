import deparam from '../src/deparam';

test('Deparam should convert simple query string to object', function () {
  expect(deparam('param1=hello&param2=world')).toEqual({
    param1: 'hello',
    param2: 'world',
  });
});

test('Deparam should coerce values if coercion is enabled', function () {
  expect(deparam('param1=10&param2=false')).toEqual({
    param1: '10',
    param2: 'false',
  });
});

test('Deparam should enable coercion of values if second parameter is passed as true', function () {
  expect(deparam('param1=10&param2=false', true)).toEqual({
    param1: 10,
    param2: false,
  });
});

test('Deparam should convert complex query string to object', function () {
  expect(deparam('param1=10&param1=20&param2=helloworld', true)).toEqual({
    param1: [10, 20],
    param2: 'helloworld',
  });
});

describe('Prototype shoult be left alone', function () {
  it('on root', function () {
    deparam('__proto__[test]=1');
    expect({}.test).toBe(undefined);
  });
  it('on nested', function () {
    deparam('test[__proto__][test]=1');
    expect({}.test).toBe(undefined);
    deparam('test[__proto__]=1&test[__proto__][test]=2');
    expect({}.test).toBe(undefined);
  });
  it('when coercing', function () {
    deparam('test[test]=test&test[test][test]=test&test[test][1][__proto__][test]=1');
    expect({}.test).toBe(undefined);
  });
});
