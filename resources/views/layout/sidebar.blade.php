<!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a class="brand-link">
      <img src="{{ asset('img/logo.png') }}" alt="Logo" class="brand-image img-circle elevation-3"
           style="opacity: .8">
      <span class="brand-text" style="color: darkgrey;">CRM</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="{{ asset('img/avatar5.png') }}" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          @php $loggedinuser = Auth::user();  @endphp
            @if($loggedinuser)
              <a href="#" class="d-block">{{$loggedinuser->name}}</a>
                @endif
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->

              <li class="nav-item has-treeview">
                <a href="{{route('home')}}" class="nav-link @if (Request::is('/')) activeMenu @endif">
                  <i class="fa fa-lg fa-fw fa-home"></i>
                  <p>
                    Dashboard
                  </p>
                </a>
              </li>

            <li class="nav-item has-treeview">
                <a href="{{route('customer.index')}}" class="nav-link @if (Request::is('customer*')) activeMenu @endif">
                    <i class="nav-icon fas fa-user"></i>
                    <p>
                        Customers
                    </p>
                </a>
            </li>

            <li class="nav-item has-treeview">
                <a href="{{route('item.index')}}" class="nav-link @if (Request::is('item*')) activeMenu @endif">
                    <i class="nav-icon fa fa-product-hunt"></i>
                    <p>
                        Items
                    </p>
                </a>
            </li>

            <li class="nav-item has-treeview">
                <a href="{{route('quotation.index')}}" class="nav-link @if (Request::is('quotation*')) activeMenu @endif">
                    <i class="nav-icon fa fa-file"></i>
                    <p>
                        Quotation
                    </p>
                </a>
            </li>

            <li class="nav-item has-treeview">
                <a href="{{route('WorkOrder')}}" class="nav-link @if (Request::is('WorkOrder')) activeMenu @endif">
                    <i class="nav-icon fa fa-lg fa-fw fa-shopping-basket"></i>
                    <p>
                        Work Orders
                    </p>
                </a>
            </li>

            <li class="nav-item has-treeview">
                <a  class="nav-link">
                    <i class="nav-icon fa fa-lg fa-fw fa-check-square-o"></i>
                    <p>
                        Account
                    </p>
                </a>
            </li>

            <li class="nav-item has-treeview">
                <a  class="nav-link">
                    <i class="nav-icon fa fa-lg fa-fw fa-podcast"></i>
                    <p>
                        HR
                    </p>
                </a>
            </li>

            <li class="nav-item has-treeview">
                <a  class="nav-link">
                    <i class="nav-icon fa fa-lg fa-fw fa-bar-chart-o"></i>
                    <p>
                        Reports
                    </p>
                </a>
            </li>
            <li class="nav-item">
                <a  class="nav-link">
                    <i class="nav-icon fa fa-lg fa-fw fa-database"></i>
                    <p>
                        Masters
                    </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="{{route('bank.index')}}" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Bank</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="{{route('make.index')}}" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Make</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="{{route('transport.index')}}" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Transport</p>
                    </a>
                  </li>
                </ul>
            </li>

            <li class="nav-item has-treeview">
                <a  class="nav-link">
                    <i class="nav-icon fa fa-lg fa-fw fa-cog"></i>
                    <p>
                        Settings
                    </p>
                </a>
            </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
<!-- Main Sidebar Container End-->

