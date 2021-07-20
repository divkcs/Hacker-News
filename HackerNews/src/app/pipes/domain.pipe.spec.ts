import { DomainPipe } from './domain.pipe';

describe('DomainPipe', () => {
  it('can load domain pipe', () => {
    const pipe = new DomainPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns hostname when url is passed', () => {
    const pipe = new DomainPipe();
    expect(pipe.transform('https://www.canalys.com/newsroom/global-smartphone-market-q2-2021"')).toEqual('canalys.com');
    expect(pipe.transform('http://web.archive.org/web/20050313023432/http://www.geocities.com/ResearchTriangle/Station/2266/tarpit/bancstar.html')).toEqual('web.archive.org');
    expect(pipe.transform('')).toEqual('');
  });
});