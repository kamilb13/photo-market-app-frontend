import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AddPhotoComponent } from './add-photo.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('AddPhotoComponent', () => {
  let component: AddPhotoComponent;
  let fixture: ComponentFixture<AddPhotoComponent>;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        AddPhotoComponent
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: UserService, useValue: {} },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPhotoComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should fetch categories on init and set filtered categories', fakeAsync(() => {
    const mockCategories = ["ANIMALS", "CARS", "OTHERS"];
    component.ngOnInit();

    const req = httpMock.expectOne('http://localhost:8080/categories');
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);

    tick();
    expect(component.categories).toEqual(mockCategories);
    expect(component.filteredCategories).toBeDefined();
  }));

  it('should update preview URL when a file is selected', () => {
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const event = {
      target: {
        files: [file]
      }
    } as unknown as Event;

    component.onFileSelected(event);
    expect(component.selectedFile).toBe(file);
    expect(component.previewUrl).toContain('blob:');
  });

});
