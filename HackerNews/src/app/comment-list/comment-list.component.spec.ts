import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { CommentListComponent } from './comment-list.component';

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;

  beforeEach(() => {
    const activatedRouteStub = () => ({ data: { subscribe: (f: any) => f({}) } });
    const sharedServiceStub = () => ({
      fetchCommentAndStoryDetails: (element: any) => ({ subscribe: (f: any) => f({}) }),
      timeConversion: (time: any) => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CommentListComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: SharedService, useFactory: sharedServiceStub }
      ]
    });
    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`commentIDs has default value`, () => {
    expect(component.commentIDs).toEqual([]);
  });

  it(`commentList has default value`, () => {
    expect(component.commentList).toEqual([]);
  });

  describe('ngOnInit', () => {
    it('calls expected methods', () => {
      spyOn(component, 'getCommentsList').and.callThrough();
      component.ngOnInit();
      expect(component.getCommentsList).toHaveBeenCalled();
    });
  });

  describe('getCommentsList', () => {
    it('calls get comment list', () => {
      const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
        SharedService
      );
      spyOn(sharedServiceStub, 'fetchCommentAndStoryDetails').and.returnValue([{"by":"throwaway290232","id":27893635,"kids":[27896383,27894294,27895649,27894221,27895164],"parent":27893283,"text":"Looks like it&#x27;s getting hugged to death: <a href=\"https:&#x2F;&#x2F;web.archive.org&#x2F;web&#x2F;20210716193902&#x2F;https:&#x2F;&#x2F;artbma.org&#x2F;about&#x2F;press&#x2F;release&#x2F;bma-security-officers-take-center-stage-as-guest-curators-of-a-new-exhibition-opening-in-march-2022\" rel=\"nofollow\">https:&#x2F;&#x2F;web.archive.org&#x2F;web&#x2F;20210716193902&#x2F;https:&#x2F;&#x2F;artbma.or...</a><p>I love the BMA. It&#x27;s a free museum with a great restaurant, cool exhibits, a nice park across the street. Nearby is The Book Thing, a free book store. Also another (non-free) book &amp; record store, Normal&#x27;s. And another, Urban Reads. And another bookstore&#x2F;coffee shop, Bird in Hand. And a farmer&#x27;s market. And a vegan restaurant. And the quirkiest diner ever, Papermoon. And a small rock venue. And a worker-owned co-op coffeeshop that President Obama visited. All in a four block radius.<p>Dang, I miss Baltimore.","time":1626788829,"type":"comment"}]);
      spyOn(sharedServiceStub, 'timeConversion').and.callThrough();
      component.getCommentsList();
      var comment = sharedServiceStub.fetchCommentAndStoryDetails(27893283);
      expect(comment).toEqual([{"by":"throwaway290232","id":27893635,"kids":[27896383,27894294,27895649,27894221,27895164],"parent":27893283,"text":"Looks like it&#x27;s getting hugged to death: <a href=\"https:&#x2F;&#x2F;web.archive.org&#x2F;web&#x2F;20210716193902&#x2F;https:&#x2F;&#x2F;artbma.org&#x2F;about&#x2F;press&#x2F;release&#x2F;bma-security-officers-take-center-stage-as-guest-curators-of-a-new-exhibition-opening-in-march-2022\" rel=\"nofollow\">https:&#x2F;&#x2F;web.archive.org&#x2F;web&#x2F;20210716193902&#x2F;https:&#x2F;&#x2F;artbma.or...</a><p>I love the BMA. It&#x27;s a free museum with a great restaurant, cool exhibits, a nice park across the street. Nearby is The Book Thing, a free book store. Also another (non-free) book &amp; record store, Normal&#x27;s. And another, Urban Reads. And another bookstore&#x2F;coffee shop, Bird in Hand. And a farmer&#x27;s market. And a vegan restaurant. And the quirkiest diner ever, Papermoon. And a small rock venue. And a worker-owned co-op coffeeshop that President Obama visited. All in a four block radius.<p>Dang, I miss Baltimore.","time":1626788829,"type":"comment"}]);
    });
  });
});
